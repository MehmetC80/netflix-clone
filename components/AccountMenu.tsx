import { signOut } from 'next-auth/react';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800 '>
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex flex-row items-center gap-3 w-full'>
          <img
            className='w-8 rounded-md'
            src='/images/default-blue.png'
            alt='profil pic'
          />
          <p className='text-white text-sm group-hover/item:underline'>
            Username
          </p>
        </div>
        <hr className='bg-gray-600 border-0 my-4 h-px' />
        <div
          onClick={() => signOut()}
          className='px-3 text-center text-white text-sm hover:underline'
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};
export default AccountMenu;
