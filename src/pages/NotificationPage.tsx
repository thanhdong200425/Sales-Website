import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  type: 'order' | 'message' | 'alert';
  userId: string;
  userName: string;
  avatar: string;
  action: string;
  orderId: string;
  orderNumber: string;
  timestamp: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'order',
    userId: '1',
    userName: 'Jonathon Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#254845',
    orderNumber: '254845',
    timestamp: '9 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    userId: '2',
    userName: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#478541',
    orderNumber: '478541',
    timestamp: '9 hours ago',
    read: true,
  },
  {
    id: '3',
    type: 'order',
    userId: '3',
    userName: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#2644B',
    orderNumber: '2644B',
    timestamp: '9 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'order',
    userId: '1',
    userName: 'Jonathon Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#254845',
    orderNumber: '254845',
    timestamp: '9 hours ago',
    read: false,
  },
  {
    id: '5',
    type: 'order',
    userId: '1',
    userName: 'Jonathon Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#254845',
    orderNumber: '254845',
    timestamp: '9 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'order',
    userId: '1',
    userName: 'Jonathon Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    action: 'Place an order',
    orderId: '#254845',
    orderNumber: '254845',
    timestamp: '9 hours ago',
    read: true,
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [selectDropdown, setSelectDropdown] = useState('all');
  const [filterDropdown, setFilterDropdown] = useState('all');

  const groupedNotifications = {
    today: notifications.slice(0, 3),
    yesterday: notifications.slice(3),
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
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
              <DropdownMenuItem onClick={() => setFilterDropdown('orders')}>
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterDropdown('messages')}>
                Messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Notifications List */}
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
                        <span className='font-semibold text-indigo-600'>
                          {notification.orderId}
                        </span>
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
                        <span className='font-semibold text-indigo-600'>
                          {notification.orderId}
                        </span>
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
      </div>
    </div>
  );
}
