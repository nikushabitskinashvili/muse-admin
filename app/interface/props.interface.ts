export interface Props {
    title?: string,
    placeholder?: string
    onClose?: () => void;
    closeModal?: ()=>void
    onSubmit?:() =>void;
}

export interface Modal{
    name:string;
    cover: any;
    image: any;
    biography: string;
}