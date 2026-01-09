"use client";
import * as React from "react";
import { useState } from "react";
import { SignupForm } from "@/devlink/stubs";
import { useRouter } from "next/navigation";

export default function RegisterFormWrapper({ initialEmail, loginType }: { initialEmail: string, loginType?: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        companyName: "",
        phone: "",
        employees: ""
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleEmployeeSelect = (value: string) => {
        setFormData(prev => ({ ...prev, employees: value }));
        // Could assume clicking these buttons sets the value
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);

        try {
            const fullName = `${formData.name} ${formData.surname}`.trim();
            // Use configured base path or default to /app to match server config
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/app';
            const res = await fetch(`${basePath}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    companyName: formData.companyName,
                    phone: formData.phone,
                    employees: formData.employees
                })
            });

            if (res.ok) {
                const data = await res.json();
                router.push(data.redirect || '/app');
                router.refresh();
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SignupForm
            // Name Input
            signUpCustomerName={{
                value: formData.name,
                onChange: handleChange('name')
            }}
            // Surname Input
            companyEmployeesCustomerSurnames={{
                value: formData.surname,
                onChange: handleChange('surname')
            }}
            // Company Name Input
            signUpCompanyName={{
                value: formData.companyName,
                onChange: handleChange('companyName')
            }}
            // Phone Input
            signUpCustomerPhone={{
                value: formData.phone,
                onChange: handleChange('phone')
            }}

            // Register Button
            signUpCompleteRegisterButton={{
                // Pass the event to prevent default form submission
                onClick: (e: any) => handleSubmit(e),
                // Input submit buttons take 'value', not 'children'
                value: isLoading ? "Registering..." : "Complete Registration"
            }}

            // Employee Selection Buttons (Examples based on prop names)
            companyEmployeesCompany110Employees={{ onClick: () => handleEmployeeSelect('1-10') }}
            companyEmployeesCompany1120Employees={{ onClick: () => handleEmployeeSelect('11-20') }}
            companyEmployeesCompany2150Employees={{ onClick: () => handleEmployeeSelect('21-50') }}
            companyEmployeesCompany51OrMoreEmployees={{ onClick: () => handleEmployeeSelect('51+') }}
        />
    );
}
