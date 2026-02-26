export default function NotificationsPage() {
    return (
        <div className="min-h-screen pb-24 md:pl-64">
            <div className="max-w-2xl mx-auto p-4 md:p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
                <div className="glass-card p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-1">No notifications yet</h3>
                    <p className="text-sm text-gray-400">You&apos;ll see updates about your listings here</p>
                </div>
            </div>
        </div>
    );
}
