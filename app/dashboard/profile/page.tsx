'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { Mail, Building, Badge, Loader2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileData {
  id: string;
  email: string;
  full_name: string;
  department: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    department: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          department: data.department || '',
          phone: data.phone || '',
          bio: data.bio || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          department: formData.department,
          phone: formData.phone,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => ({
        ...prev!,
        ...formData,
      }));
      
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-2">Manage your personal information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Avatar Section */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                <span className="text-3xl font-bold text-white">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg">
                <Camera size={14} />
              </button>
            </div>
            
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Info */}
          {!editing ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {profile?.full_name || 'Not set'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Role</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1 capitalize">
                    {profile?.role || 'User'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {profile?.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {profile?.department || 'Not assigned'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {profile?.phone || 'Not set'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Member Since</label>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              
              {profile?.bio && (
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Bio</label>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{profile.bio}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
                  >
                    <option value="">Select Department</option>
                    <option>Seismology</option>
                    <option>Geodesy</option>
                    <option>Geomagnetism</option>
                    <option>Exploration Geophysics</option>
                    <option>Environmental Geophysics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      full_name: profile?.full_name || '',
                      department: profile?.department || '',
                      phone: profile?.phone || '',
                      bio: profile?.bio || '',
                    });
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Account Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Badge size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold">Account Status</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">Active</p>
          <p className="text-sm text-gray-500 mt-1">Your account is verified</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Building size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold">Department</h3>
          </div>
          <p className="text-xl font-semibold">{profile?.department || 'Not assigned'}</p>
          <p className="text-sm text-gray-500 mt-1">Research Department</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Mail size={20} className="text-green-600" />
            </div>
            <h3 className="font-semibold">Email Verified</h3>
          </div>
          <p className="text-xl font-semibold text-green-600">Yes</p>
          <p className="text-sm text-gray-500 mt-1">Your email is confirmed</p>
        </div>
      </div>
    </div>
  );
}