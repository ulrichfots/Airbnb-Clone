'use client';
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
            className="py-4 border-b-[1px]">
                {/* appelle du contenu strutturé du navbar dans le fichier component/navbar/Container.tsx, et affichage sur le navigateur */}
                <Container>
                    <div
                    className="
                    flex
                    flex-row
                    items-center 
                    justify-between
                    gap-3
                    md:gap-0">
                        {/* appelle du contenu structuré du logo dans le fichier component/navbar/Logo.tsx, et affichage sur le navigateur */}
                        <Logo />

                        <Search />

                        <UserMenu />
                    </div>
                </Container>
            </div>
           
        </div>
    )
}

export default Navbar;