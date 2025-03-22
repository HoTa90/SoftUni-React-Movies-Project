

export default function HomeSkeleton() {
    return (
        <div className="flex items-center justify-between p-6 w-full h-screen animate-pulse">
            <div className="flex flex-col ml-20 space-y-4 w-1/3">
                <div className="h-9 skeleton rounded w-3/4"></div>
                <div className="h-9 skeleton rounded w-3/4"></div>
                <div className="h-5 skeleton rounded w-2/4"></div>
                <div className="h-6 skeleton rounded w-1/4"></div>
            </div>
            <div className="w-120 h-150 mr-25 skeleton rounded"></div>
        </div>
    );
};

