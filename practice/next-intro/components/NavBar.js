import Link from "next/link";

export default function NavBar() {
    return <>
        <Link href="/"><a><div>Home</div></a></Link>
        <Link href="/about"><a><div>About</div></a></Link>
    </>
}