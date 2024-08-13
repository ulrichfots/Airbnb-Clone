import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal'; 
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal(); 

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen(); // useLoginModal pour ouvrir la modal de connexion
        }
        rentModal.onOpen(); // useRentModal pour ouvrir la modal de location
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Créer une annonce
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                 <MenuItem onClick={() => {}} classn='text-green-700 uppercase' label={currentUser.name || 'Utilisateur'} />
                                <MenuItem onClick={() => router.push('/profil')} label="Mon Profil" />
                                <MenuItem onClick={() => router.push('/trips')} label="Mes voyages" />
                                <MenuItem onClick={() => router.push('/favorites')} label="Mes favoris" />
                                <MenuItem onClick={() => router.push('/reservations')} label="Mes Réservations" /> 
                                <MenuItem onClick={() => router.push('/properties')} label="Mes Annonces" />
                                <MenuItem onClick={() => router.push('/history')} label="Historiques des Réservations" />
                                {/* <MenuItem onClick={() => router.push('/dashboard')} label="Dashboard" /> */}
                                {/* <MenuItem onClick={() => router.push('/gerants')} label="Gérants" /> */}
                                {/* <MenuItem onClick={() => router.push('/loggerants')} label="login" /> */}
                                
                                <hr />
                                <MenuItem  onClick={() => signOut({ callbackUrl: '/' })} label="Se déconnecter" />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Connexion" />
                                <MenuItem onClick={registerModal.onOpen} label="Inscription" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
