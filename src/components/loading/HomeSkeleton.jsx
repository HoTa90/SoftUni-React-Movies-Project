

export default function HomeSkeleton() {
    return (
        <div className="flex items-center justify-between p-6 w-full h-screen bg-gray-800 animate-pulse">
            <div className="flex flex-col ml-20 space-y-4 w-1/3">
                <div className="h-9 bg-gray-500 rounded w-3/4"></div>
                <div className="h-9 bg-gray-500 rounded w-3/4"></div>
                <div className="h-5 bg-gray-500 rounded w-2/4"></div>
                <div className="h-6 bg-gray-500 rounded w-1/4"></div>
            </div>
            <div className="w-120 h-150 mr-25 bg-gray-500 rounded"></div>
        </div>
    );
};

