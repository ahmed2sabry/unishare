import Link from "next/link";

function BackToLoginBtn() {
  return (
    <Link href="/auth/login" className="btn-primary" type="button">
      Back To Login
    </Link>
  );
}

export default BackToLoginBtn;
