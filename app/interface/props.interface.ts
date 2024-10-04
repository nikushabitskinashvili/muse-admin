export interface Props {
    title?: string,
    placeholder?: string
    closeModal?: () => void
    onSubmit?: () => void;
    bg?: boolean;
    onClick?: () => void;
    closepop?: () => void;
    refreshArtists?: () => void;
    id?: string | number;
    onClose?: () => void;
}

export interface Modal {
    name: string;
    cover: string;
    image: string;
    biography: string;
    date?: number;
}

export interface albumModal {
    title: string;
    album: string;
    releaseDate: number;
    artistId: number;
    onClose?: () => void;
}

export interface songModal {
    name: string;
    music: string;
    albumId: number;
    onClose?: () => void;
}

 export interface User {
    id: number;
    email: string;
    role: string;
    blocked: boolean; 
    onClose?: () => void;
}





