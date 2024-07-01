'use client'; // Directive indiquant que ce fichier doit être traité comme du code côté client (React).

import axios from 'axios'; // Importation d'axios pour les requêtes HTTP.
import { AiFillGithub } from 'react-icons/ai'; // Importation de l'icône GitHub.
import { FaGoogle } from 'react-icons/fa'; // Importation de l'icône Google.
import { useCallback, useState } from 'react'; // Importation des hooks useCallback et useState de React.
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'; // Importation de react-hook-form pour la gestion des formulaires.
import useRegisterModal from '@/app/hooks/useRegisterModal'; // Importation du hook personnalisé pour gérer l'état du modal d'inscription.
import Modal from './Modal'; // Importation du composant Modal.
import Heading from '../Heading';
import Input from '../inputs/Input';

const RegisterModal = () => {
    const registerModal = useRegisterModal(); // Utilisation du hook personnalisé pour accéder à l'état et aux méthodes du modal d'inscription.
    const [isLoading, setIsLoading] = useState(false); // État local pour gérer l'indicateur de chargement.

    // Utilisation du hook useForm pour gérer les valeurs et les actions du formulaire.
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '', // Valeur par défaut pour le champ "name".
            email: '', // Valeur par défaut pour le champ "email".
            password: '', // Valeur par défaut pour le champ "password".
        }
    });

    // Fonction appelée lors de la soumission du formulaire.
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true); // Activation de l'indicateur de chargement.

        // Envoi des données du formulaire au serveur via une requête POST.
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose(); // Fermeture du modal en cas de succès.
        })
        .catch((error) => {
            console.log(error); // Affichage de l'erreur en cas d'échec.
        })
        .finally(() => {
            setIsLoading(false); // Désactivation de l'indicateur de chargement.
        });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title= 'Bienvenue Chez Atypik-House'
            subtitle= 'Créér un Compte!'
            />
            <Input
             id="email"
             label="Email"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
             />

            <Input
             id="name"
             label="name"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
             />

            <Input
             id="password"
             type="password"
             label="password"
             disabled={isLoading}
             register={register}
             errors={errors}
             required
             />
        </div>
    )

    // Rendu du composant Modal avec les propriétés nécessaires.
    return (
        <Modal
            disabled={isLoading} // Désactivation des interactions du modal si l'indicateur de chargement est actif.
            isOpen={registerModal.isOpen} // État d'ouverture/fermeture du modal.
            title="Register" // Titre du modal.
            actionLabel="Continue" // Libellé de l'action du bouton de soumission.
            onClose={registerModal.onClose} // Fonction de fermeture du modal.
            onSubmit={handleSubmit(onSubmit)} // Gestionnaire de soumission du formulaire.
            body={bodyContent}
        />
    );
}

export default RegisterModal; // Exportation du composant RegisterModal pour l'utilisation dans d'autres parties de l'application.
