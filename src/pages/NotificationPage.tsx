import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getNotifications,
  markNotificationAsRead,
  type Notification as ApiNotification,
} from '@/services/api';

interface Notification extends ApiNotification {
  timestamp: string;
  userName: string;
  avatar: string;
}

const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectDropdown, setSelectDropdown] = useState('all');
  const [filterDropdown, setFilterDropdown] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, [selectDropdown, filterDropdown]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const filters: any = {};

      if (filterDropdown !== 'all') {
        filters.type = filterDropdown;
      }

      if (selectDropdown === 'read') {
        filters.read = true;
      } else if (selectDropdown === 'unread') {
        filters.read = false;
      }

      const response = await getNotifications(filters);

      const transformedNotifications = response.data.map((notif) => ({
        ...notif,
        timestamp: formatTimeAgo(notif.createdAt),
        userName: notif.user.name || 'Unknown User',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(notif.user.name || 'U')}&background=random`,
      }));

      setNotifications(transformedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedNotifications = {
    today: notifications.filter((n) => {
      const diffInHours = (new Date().getTime() - new Date(n.createdAt).getTime()) / (1000 * 60 * 60);
      return diffInHours < 24;
    }),
    yesterday: notifications.filter((n) => {
      const diffInHours = (new Date().getTime() - new Date(n.createdAt).getTime()) / (1000 * 60 * 60);
      return diffInHours >= 24;
    }),
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(
        notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className='min-h-screen bg-white py-8 px-4 md:px-6'>
      <div className='mx-auto max-w-6xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Notification</h1>
        </div>

        {/* Controls Section */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
          {/* Select Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
              >
                {selectDropdown.charAt(0).toUpperCase() + selectDropdown.slice(1)}
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectDropdown('all')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectDropdown('read')}>
                Read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectDropdown('unread')}>
                Unread
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='border-slate-200 rounded-lg'
              >
                {filterDropdown.charAt(0).toUpperCase() + filterDropdown.slice(1)}
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setFilterDropdown('all')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterDropdown('order')}>
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterDropdown('message')}>
                Messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600'></div>
            <p className='mt-4 text-slate-600'>Loading notifications...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && notifications.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-slate-600'>No notifications found.</p>
          </div>
        )}

        {/* Notifications List */}
        {!loading && notifications.length > 0 && (
        <div className='space-y-6'>
          {/* Today Section */}
          {groupedNotifications.today.length > 0 && (
            <div>
              <h2 className='text-lg font-semibold text-slate-900 mb-4'>Today</h2>
              <div className='space-y-3'>
                {groupedNotifications.today.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      notification.read
                        ? 'border-slate-200 bg-white'
                        : 'border-indigo-200 bg-indigo-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <input
                      type='checkbox'
                      className='h-5 w-5 rounded accent-indigo-600'
                      checked={notification.read}
                      onChange={() => handleMarkAsRead(notification.id)}
                    />

                    {/* Avatar */}
                    <div className='shrink-0'>
                      <img
                        src={notification.avatar}
                        alt={notification.userName}
                        className='h-12 w-12 rounded-full object-cover'
                      />
                    </div>

                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-baseline gap-2'>
                        <span className='font-semibold text-slate-900'>
                          {notification.userName}
                        </span>
                        <span className='text-slate-600'>
                          {notification.action}
                        </span>
                        {notification.orderNumber && (
                          <span className='font-semibold text-indigo-600'>
                            #{notification.orderNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className='shrink-0 text-sm text-slate-500'>
                      {notification.timestamp}
                    </div>

                    {/* Status Badge and Details Button */}
                    <div className='flex items-center gap-3'>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          notification.read
                            ? 'text-slate-600 bg-slate-100'
                            : 'text-indigo-600 bg-indigo-100'
                        }`}
                      >
                        {notification.read ? 'Read' : 'Unread'}
                      </span>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-lg'
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday Section */}
          {groupedNotifications.yesterday.length > 0 && (
            <div>
              <h2 className='text-lg font-semibold text-slate-900 mb-4'>Yesterday</h2>
              <div className='space-y-3'>
                {groupedNotifications.yesterday.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      notification.read
                        ? 'border-slate-200 bg-white'
                        : 'border-indigo-200 bg-indigo-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <input
                      type='checkbox'
                      className='h-5 w-5 rounded accent-indigo-600'
                      checked={notification.read}
                      onChange={() => handleMarkAsRead(notification.id)}
                    />

                    {/* Avatar */}
                    <div className='shrink-0'>
                      <img
                        src={notification.avatar}
                        alt={notification.userName}
                        className='h-12 w-12 rounded-full object-cover'
                      />
                    </div>

                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-baseline gap-2'>
                        <span className='font-semibold text-slate-900'>
                          {notification.userName}
                        </span>
                        <span className='text-slate-600'>
                          {notification.action}
                        </span>
                        {notification.orderNumber && (
                          <span className='font-semibold text-indigo-600'>
                            #{notification.orderNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className='shrink-0 text-sm text-slate-500'>
                      {notification.timestamp}
                    </div>

                    {/* Status Badge and Details Button */}
                    <div className='flex items-center gap-3'>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          notification.read
                            ? 'text-slate-600 bg-slate-100'
                            : 'text-indigo-600 bg-indigo-100'
                        }`}
                      >
                        {notification.read ? 'Read' : 'Unread'}
                      </span>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-lg'
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
