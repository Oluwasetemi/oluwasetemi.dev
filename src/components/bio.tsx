import me from "../data/me.json";

type BioProps = {
  footer?: boolean;
};

export default function Bio({ footer = false }: BioProps) {
  return (
    <div className="bio">
      <img
        src="/images/setemi.jpg"
        alt="Oluwasetemi Ojo"
        className="bio-image"
      />
      <p>
        {footer ? "I'm" : "Written by"}
        {" "}
        <strong>
          <a
            className="link"
            href="https://github.com/oluwasetemi"
            target="_blank"
            rel="noreferrer"
          >
            {me.name}
          </a>
          {" "}
          Full Stack Developer,
        </strong>
        {" "}
        A FullStack Developer (Reactjs, Nodejs, Typescript), currently lives in
        Osogbo, Nigeria with my lovely Wife
        {" "}
        <a
          className="link"
          href="https://twitter.com/BeagloOfficial"
          target="_blank"
          rel="noreferrer"
        >
          Temidayo
        </a>
        {" "}
        and beautiful daughter Esther .🎈
        <br />
        <a
          className="link"
          href="https://mobile.twitter.com/oluwasetemi"
          target="_blank"
          rel="noreferrer"
        >
          Say Hi to Him on Twitter.
          {" "}
          <br />
        </a>
        <a href="/tags">
          You can search through my blog using custom tags• 🏷
          {" "}
        </a>
        .
        <br />
        {" "}
        <a href="/about">Click here to read more about me.</a>
        {" "}
        <a className="link" href="/rss.xml" target="_blank">
          For RSS feed.
          <span role="img" aria-label="the world">
            🌍
          </span>
        </a>
      </p>
    </div>
  );
}
