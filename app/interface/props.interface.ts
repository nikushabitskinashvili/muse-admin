export interface Props {
    title?: string,
    placeholder?: string
    onClose?: () => void;
    closeModal?: ()=>void
    onSubmit?:() =>void;
}

export interface Modal{
    name:string;
    cover: string;
    image: string;
    biography: string;
}