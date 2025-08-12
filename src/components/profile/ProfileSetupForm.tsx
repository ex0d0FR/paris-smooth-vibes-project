
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type ProfileSetupFormProps = {
  userId: string;
  initialValues?: {
    phone_number?: string | null;
    city?: string | null;
    country?: string | null;
    church_name?: string | null;
  };
  onCompleted?: () => void;
};

const ProfileSetupForm: React.FC<ProfileSetupFormProps> = ({ userId, initialValues, onCompleted }) => {
  const { toast } = useToast();
  const [values, setValues] = useState({
    phone_number: initialValues?.phone_number || '',
    city: initialValues?.city || '',
    country: initialValues?.country || '',
    church_name: initialValues?.church_name || '',
  });
  const [saving, setSaving] = useState(false);

  const isValid = useMemo(() => {
    return Boolean(values.city && values.country && values.phone_number);
  }, [values]);

  const handleChange = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast({
        title: 'Missing information',
        description: 'Please fill in at least phone number, city, and country.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        phone_number: values.phone_number || null,
        city: values.city || null,
        country: values.country || null,
        church_name: values.church_name || null,
      })
      .eq('user_id', userId);

    setSaving(false);

    if (error) {
      console.error('Profile update error:', error);
      toast({
        title: 'Error',
        description: 'Could not save your information. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Profile updated',
      description: 'Thanks! Your registration details were saved.',
    });

    onCompleted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone_number">Phone number</Label>
          <Input
            id="phone_number"
            value={values.phone_number}
            onChange={handleChange('phone_number')}
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        <div>
          <Label htmlFor="church_name">Church name (optional)</Label>
          <Input
            id="church_name"
            value={values.church_name}
            onChange={handleChange('church_name')}
            placeholder="Your church or organization"
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={values.city}
            onChange={handleChange('city')}
            placeholder="Paris"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={values.country}
            onChange={handleChange('country')}
            placeholder="France"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving || !isValid} className="min-w-[140px]">
          {saving ? 'Saving...' : 'Save details'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileSetupForm;
