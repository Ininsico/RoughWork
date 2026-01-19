const ProfileCard = () => {
  return (
    <div>
      <div className="bg-white mx-auto pt-4 rounded-lg shadow-lg overflow-hidden max-w-sm">
        <div className="h-32 bg-gradient-to-br from-purple-500 to-blue-400"></div>
        <div className="px-6 py-6">
          <div className="relative -top-10 mb-2">
            <div className="w-24 h-24 rounded-full border-4 border-white mx-auto bg-gray-700 flex item-center justify-center">
              <span className="text-3xl font-bold text-gray-700">AR</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">Arslan Rathore</h2>
            <p className="text-gray-800">FullStack dev & Ml Engineer</p>
            <p className="text-green-400 text-sm mt-2">Abbottabad,Pakistan</p>
          </div>
          <div className="flex justify-around mt-6 pt-6 border-t border-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">245</div>
              <div className="text-red-400 text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">1.4k</div>
              <div className="text-red-400 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">124</div>
              <div className="text-red-400 text-sm">Following</div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-blue-400 hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition-colors">
              Follow
            </button>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-400 font-medium py-2 rounded-lg transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}