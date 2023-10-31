export default function Layout({ children }) {
  return (
    <div>
      <marquee style={{ color: "purple", background: "#fff" }}>
        El mejor canal de Twitch de programación: @midudev
      </marquee>
      {children}
    </div>
  );
}
