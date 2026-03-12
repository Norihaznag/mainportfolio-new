export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          created_at: string;
          business_name: string;
          business_type: string;
          contact_name: string;
          whatsapp_number: string;
          email: string;
          website_type: string;
          language: 'ar' | 'fr' | 'en';
          notes: string | null;
          status: 'pending' | 'in_progress' | 'delivered';
          price: number;
        };
        Insert: {
          business_name: string;
          business_type: string;
          contact_name: string;
          whatsapp_number: string;
          email: string;
          website_type: string;
          language: 'ar' | 'fr' | 'en';
          notes?: string | null;
          status?: 'pending';
          price: number;
        };
        Update: {
          status?: 'pending' | 'in_progress' | 'delivered';
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'user';
          created_at: string;
        };
      };
    };
  };
}
