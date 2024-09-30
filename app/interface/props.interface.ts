export interface Props {
    title?: string,
    placeholder?: string
    onClose: () => void;
    closeModal?: () => void
    onSubmit?: () => void;
    bg?: boolean;
    onClick?: () => void;
    closepop?: () => void;
    refreshArtists?: () => void;
    id?: number;
}

export interface Modal {
    name: string;
    cover: any;
    image: any;
    biography: string;
    date?: number;
}

export interface albumModal {
    title: string;
    album: any;
    releaseDate: number;
    artistId: number;
}

export interface songModal {
    title: string;
    releaseDate: number;
    music: any;
    albumId: number;
}

