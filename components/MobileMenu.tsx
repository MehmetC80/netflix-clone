interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return <div></div>;
  }

  return (
    <div
      className='
  bg-black
  w-56
  absolute
  top-8
  left-0
  py-5
  flex-col
  border-2
  border-gray-800
  '
    >
      <div
        className=' flex flex-col gap-4
        '
      >
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          Home
        </div>
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          Series
        </div>
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          Movies
        </div>
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          New and Popular
        </div>
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          My List
        </div>
        <div className='text-gray-200 hover:text-gray-400 px-3 text-center hover:underline'>
          Browse by Languages
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
