const StatsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* 
        bg-white = white background
        rounded-xl = extra large border radius
        shadow-md = medium shadow
        p-6 = padding 1.5rem (24px)
      */}
      
      <div className="flex items-center justify-between mb-4">
        {/* 
          flex = display flex
          items-center = vertical alignment center
          justify-between = horizontal space between
          mb-4 = margin bottom 1rem
        */}
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {/* 
              text-sm = small text size
              font-medium = medium font weight
              text-gray-500 = medium gray color
              uppercase = all caps
              tracking-wider = letter spacing wider
            */}
            Total Revenue
          </h3>
          
          <div className="flex items-baseline mt-1">
            {/* 
              items-baseline = align to text baseline
              mt-1 = margin top 0.25rem
            */}
            
            <span className="text-3xl font-bold text-gray-900">
              $54,231
            </span>
            
            <span className="ml-2 text-sm font-semibold text-green-600">
              {/* 
                ml-2 = margin left 0.5rem
                text-sm = small text
                font-semibold = semi-bold
                text-green-600 = green color
              */}
              +12.5%
            </span>
          </div>
        </div>
        
        {/* Icon */}
        <div className="bg-blue-100 p-3 rounded-lg">
          {/* 
            bg-blue-100 = light blue background
            p-3 = padding 0.75rem
            rounded-lg = large border radius
          */}
          
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        {/* 
          border-t = top border
          border-gray-200 = light gray border
          pt-4 = padding top 1rem
        */}
        
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">+$2,450</span> vs last month
        </p>
      </div>
    </div>
  );
};
const Hero: React.FC = () => {
  return (
    <div>
      <StatsCard />
    </div>
  )
}
export default Hero;