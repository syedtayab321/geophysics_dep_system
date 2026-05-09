import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Check if demo user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'admin@geophysics.com')
      .single();
    
    if (existingUser) {
      return NextResponse.json({ message: 'Demo user already exists' });
    }
    
    // Create demo user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@geophysics.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User',
        department: 'Seismology',
        role: 'admin',
      },
    });
    
    if (authError) throw authError;
    
    // Create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: 'admin@geophysics.com',
            full_name: 'Admin User',
            department: 'Seismology',
            role: 'admin',
          },
        ]);
      
      if (profileError) throw profileError;
    }
    
    return NextResponse.json({ 
      message: 'Demo user created successfully',
      credentials: {
        email: 'admin@geophysics.com',
        password: 'password123'
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup demo user' },
      { status: 500 }
    );
  }
}