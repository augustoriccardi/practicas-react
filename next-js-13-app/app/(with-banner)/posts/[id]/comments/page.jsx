import Image from "next/image";

const fetchComments = async (id) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Error al cargar los comentarios");

  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
};

export default async function Post({ params }) {
  const { id } = params;
  const comments = await fetchComments(id);
  return (
    <ul
      style={{
        background: "#444",
        fontSize: "10px",
        borderRadius: "3px",
        padding: "6px 10px",
        marginTop: "10px",
      }}
    >
      {comments.map((comment) => (
        <li key={comment.borderRadius}>
          <Image
            width="50"
            height="50"
            alt={comment.name}
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${comment.name}.svg`}
          />
          <h2>{comment.name}</h2>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}

//https://www.youtube.com/watch?v=tA-_vAz9y78
//1:15
