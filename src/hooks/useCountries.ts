import { useState, useEffect } from 'react';
import { Country } from '../types';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
        const data = await response.json();
        
        const processedCountries = data
          .filter((country: Country) => country.idd?.root)
          .map((country: Country) => ({
            ...country,
            dialCode: `${country.idd.root}${country.idd.suffixes?.[0] || ''}`,
          }))
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        
        setCountries(processedCountries);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};