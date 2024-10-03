import Users from "../Components/Users/Users";

export default function Home() {
  return (
    <>
    <Users onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    </>
  );
}
