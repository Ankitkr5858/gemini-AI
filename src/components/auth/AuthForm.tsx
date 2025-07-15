import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCountries } from '../../hooks/useCountries';
import { useAuthStore } from '../../store/authStore';

const phoneSchema = z.object({
  countryCode: z.string(),
  phone: z.string().min(6, 'Phone number must be at least 6 digits'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export const AuthForm: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [phoneData, setPhoneData] = useState<PhoneFormData | null>(null);
  const { countries, loading: countriesLoading } = useCountries();
  const { login } = useAuthStore();

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+91',
      phone: '',
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    setLoading(true);
    setPhoneData(data);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('OTP sent successfully!');
    setStep('otp');
    setLoading(false);
  };

  const handleOTPSubmit = async (data: OTPFormData) => {
    setLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.otp === '123456') {
      toast.success('Login successful!');
      login({
        id: 'user-1',
        phone: phoneData!.phone,
        countryCode: phoneData!.countryCode,
        name: 'User',
      });
    } else {
      toast.error('Invalid OTP. Try 123456');
      setLoading(false);
    }
  };

  if (step === 'phone') {
    return (
      <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span id="country-label">
            Country Code
            </span>
          </label>
          <select
            {...phoneForm.register('countryCode')}
            aria-labelledby="country-label"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            disabled={countriesLoading}
          >
            <option value="+91">🇮🇳 India (+91)</option>
            <option value="+1">🇺🇸 United States (+1)</option>
            <option value="+44">🇬🇧 United Kingdom (+44)</option>
            <option value="+86">🇨🇳 China (+86)</option>
            <option value="+81">🇯🇵 Japan (+81)</option>
            <option value="+49">🇩🇪 Germany (+49)</option>
            <option value="+33">🇫🇷 France (+33)</option>
            <option value="+39">🇮🇹 Italy (+39)</option>
            <option value="+7">🇷🇺 Russia (+7)</option>
            <option value="+55">🇧🇷 Brazil (+55)</option>
            {countries.map((country: any) => (
              <option key={country.cca2} value={country.dialCode}>
                {country.flag} {country.name.common} ({country.dialCode})
              </option>
            ))}
          </select>
          {phoneForm.formState.errors.countryCode && (
            <p className="text-sm text-red-600 mt-1">
              {phoneForm.formState.errors.countryCode.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span id="phone-label">
            Phone Number
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input
              {...phoneForm.register('phone')}
              type="tel"
              aria-labelledby="phone-label"
              aria-describedby={phoneForm.formState.errors.phone ? "phone-error" : undefined}
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
            />
          </div>
          {phoneForm.formState.errors.phone && (
            <p className="text-sm text-red-600 mt-1">
            id="phone-error"
            role="alert"
              {phoneForm.formState.errors.phone.message}
            </p>
          )}
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Send OTP
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span id="otp-label">
          Enter OTP
          </span>
        </label>
        <input
          {...otpForm.register('otp')}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-labelledby="otp-label"
          aria-describedby={otpForm.formState.errors.otp ? "otp-error" : "otp-hint"}
          placeholder="123456"
          maxLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
        />
        {otpForm.formState.errors.otp && (
          <p className="text-sm text-red-600 mt-1">
            id="otp-error"
            role="alert"
            {otpForm.formState.errors.otp.message}
          </p>
        )}
      </div>
      
      <p 
        id="otp-hint"
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        OTP sent to {phoneData?.countryCode} {phoneData?.phone}
      </p>
      
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setStep('phone')}
          className="flex-1"
        >
          Back
        </Button>
        <Button type="submit" loading={loading} className="flex-1">
          Verify OTP
        </Button>
      </div>
    </form>
  );
};