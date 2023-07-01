import { signOut } from "firebase/auth";
import { Power } from '@phosphor-icons/react';
import { auth } from '../../../../services/firebase';
import { AddContact } from "../ContactList/AddContact";
import { ThemeSwitcher } from "../ThemeSwitcher";

export const Footer = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-1/3 absolute bottom-10 flex flex-col">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <span className="cursor-pointer hover:scale-110 flex">
                    <Power color="#ef4444" size={32} onClick={handleLogout} className="mr-5" />
                    <AddContact />    
                    <ThemeSwitcher />                
                </span>
            </div>
        </div>
    )
}