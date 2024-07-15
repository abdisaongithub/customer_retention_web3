import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';

import NexusLogo from '../../assets/nexus_logo.png';

const SignIn = () => {
    return (
        <div className="h-screen flex flex-col">
            <img src={NexusLogo} className='h-36 object-contain mt-4' />
            <div className="flex flex-col space-y-4 px-4 py-8 bg-white rounded-md shadow-lg mt-0 m-4 border border-black">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <form className="flex flex-col space-y-4">
                    
                <p className='mb-0 pb-0'>
                    Email</p>
                    <Input
                        label="Email"
                        type="email"
                        className="w-full mt-0 pt-0" 
                        required
                    />
                    <p className='mt-1 pb-0'>
                    Password</p>
                    <Input
                        label="Password"
                        type="password"
                        className="w-full"
                        required
                    />
                    <Button type="outline"  className="w-full">Sign In</Button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
