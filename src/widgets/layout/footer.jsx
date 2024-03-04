
export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between lg:justify-between xl:justify-between">
        <span> &copy; {year}, Creado por Snabbit</span>
      </div>
    </footer>
  );
}

export default Footer;
