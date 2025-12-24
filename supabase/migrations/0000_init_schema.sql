-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enum for Sync Status
create type sync_status as enum ('synced', 'pending', 'error');

-- CUSTOMERS Table
create table customers (
  id uuid primary key default uuid_generate_v4(),
  podio_item_id bigint unique,
  auth0_id text unique,
  name text,
  email text,
  type integer default 1, -- 1: Customer, 2: Biz Admin, 3: Biz Employee
  sync_status sync_status default 'pending',
  last_updated_at timestamp with time zone default now()
);

alter table customers enable row level security;

-- STUDENTS Table
create table students (
  id uuid primary key default uuid_generate_v4(),
  podio_item_id bigint unique,
  auth0_id text unique,
  name text,
  email text,
  sync_status sync_status default 'pending',
  last_updated_at timestamp with time zone default now()
);

alter table students enable row level security;

-- DEVICES Table
create table devices (
  id uuid primary key default uuid_generate_v4(),
  podio_item_id bigint unique,
  serial_number text,
  specs text,
  status text,
  owner_id uuid references customers(id),
  sync_status sync_status default 'pending',
  last_updated_at timestamp with time zone default now()
);

alter table devices enable row level security;

-- SERVICES Table
create table services (
  id uuid primary key default uuid_generate_v4(),
  podio_item_id bigint unique,
  status text,
  date timestamp with time zone,
  device_id uuid references devices(id),
  sync_status sync_status default 'pending',
  last_updated_at timestamp with time zone default now()
);

alter table services enable row level security;

-- SPARE PARTS Table
create table spare_parts (
  id uuid primary key default uuid_generate_v4(),
  podio_item_id bigint unique,
  name text,
  warranty_date date,
  sync_status sync_status default 'pending',
  last_updated_at timestamp with time zone default now()
);

alter table spare_parts enable row level security;

-- RLS POLICIES (Basic Draft)

-- Customers can view their own profile
create policy "Users can view own customer profile" on customers
  for select using (auth.uid()::text = auth0_id);

-- Students can view their own profile
create policy "Users can view own student profile" on students
  for select using (auth.uid()::text = auth0_id);

-- Customers can view their own devices
create policy "Users can view own devices" on devices
  for select using (
    exists (
      select 1 from customers
      where customers.id = devices.owner_id
      and customers.auth0_id = auth.uid()::text
    )
  );

-- Customers can view services for their devices
create policy "Users can view own services" on services
  for select using (
    exists (
      select 1 from devices
      join customers on customers.id = devices.owner_id
      where devices.id = services.device_id
      and customers.auth0_id = auth.uid()::text
    )
  );
