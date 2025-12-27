'use client';

import React, { useState, useTransition } from 'react';
import { SignupForm } from '@/devlink/SignupForm';
import { registerCustomer } from './actions';
import { DevLinkProvider } from '@/devlink'; // Needed? Usually global layout has it or Next.js handles it if configured. 
// If DevLink uses context, we might need provider. But usually for pure components it's fine.
// Although `interactions.ts` might need context? No, it uses `useInteractions` hook.

interface RegisterFormProps {
    initialEmail?: string;
    initialName?: string;
    initialPicture?: string;
}

export default function RegisterForm({ initialEmail, initialName, initialPicture }: RegisterFormProps) {
    // Attempt to split name
    const parts = (initialName || '').split(' ');
    const firstNameInit = parts[0] || '';
    const lastNameInit = parts.slice(1).join(' ') || '';

    const [firstName, setFirstName] = useState(firstNameInit);
    const [lastName, setLastName] = useState(lastNameInit);
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companySize, setCompanySize] = useState('');

    // We can also track if company is toggled explicitly if needed, but the fields are just inputs.
    // If they are hidden, the user won't fill them.

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phone', phone);
        if (companyName) formData.append('companyName', companyName);
        if (companySize) formData.append('companySize', companySize);

        startTransition(async () => {
            const result = await registerCustomer(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                // Force a full reload/navigation to dashboard to ensure fresh data fetch
                window.location.href = '/';
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            {/* Error Toast/Message */}
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <SignupForm
                signUpCustomerName={{
                    value: firstName,
                    onChange: (e: any) => setFirstName(e.target.value)
                }}
                companyEmployeesCustomerSurnames={{
                    value: lastName,
                    onChange: (e: any) => setLastName(e.target.value)
                }}
                signUpCustomerPhone={{
                    value: phone,
                    onChange: (e: any) => setPhone(e.target.value)
                }}
                signUpCompanyName={{
                    value: companyName,
                    onChange: (e: any) => setCompanyName(e.target.value)
                }}

                // Radio Buttons for Company Size
                // Value is static in DOM ("1-10", "11-20" etc), but we want to control checked state?
                // Or just listen to change.
                companyEmployeesCompany110Employees={{
                    checked: companySize === '1-10',
                    onChange: () => setCompanySize('1-10')
                }}
                companyEmployeesCompany1120Employees={{
                    checked: companySize === '11-20',
                    onChange: () => setCompanySize('11-20')
                }}
                companyEmployeesCompany2150Employees={{
                    checked: companySize === '21-50',
                    onChange: () => setCompanySize('21-50')
                }}
                companyEmployeesCompany51OrMoreEmployees={{
                    checked: companySize === '51 or more',
                    onChange: () => setCompanySize('51 or more')
                }}

                signUpCompleteRegisterButton={{
                    onClick: handleSubmit,
                    // Show loading state text if pending
                    value: isPending ? "Registrando..." : "Completar registro",
                    disabled: isPending
                    // Note: `value` prop sets the text for standard button inputs, 
                    // check if FormButton uses `value` prop or children. 
                    // SignupForm: <FormButton value="Completar registro" ... />
                    // So passing `value` prop overrides it.
                }}
            />
        </div>
    );
}
