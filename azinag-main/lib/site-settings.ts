import { supabase } from './supabase';

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) throw error;

    const settings: { [key: string]: string } = {};
    data?.forEach((setting) => {
      settings[setting.key] = setting.value;
    });

    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {};
  }
}

export async function getSiteSetting(key: string) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) throw error;
    return data?.value || null;
  } catch (error) {
    console.error(`Error fetching site setting ${key}:`, error);
    return null;
  }
}

export async function updateSiteSetting(key: string, value: string) {
  try {
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .eq('key', key)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('site_settings')
        .insert([{ key, value }]);
      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error(`Error updating site setting ${key}:`, error);
    return false;
  }
}
