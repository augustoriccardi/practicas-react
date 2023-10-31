import "./App.css";
import { Item } from "./components/item";
import { useItems } from "./hooks/useItems";
import { useSEO } from "./hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

// const INITIAL_ITEMS: Item[] = [
//   { id: crypto.randomUUID(), timestamp: new Date(), text: "Videojuegos 🎮" },
//   { id: crypto.randomUUID(), timestamp: new Date(), text: "Libros 📚" },
// ];

function App() {
  const { items, addItem, removeItem } = useItems();
  useSEO({
    title: `[${items.length}] Prueba técnica de React`,
    description: "Añadir y eliminar elementos de una lista",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    addItem(input.value);
    input.value = "";
  };

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id);
  };

  return (
    <main>
      <aside>
        <h1>Prueba técnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>

        <form aria-label="añadir elementos a la lista" onSubmit={handleSubmit}>
          <label>
            Elemento a introducir:
            <input
              name="item"
              required
              type="text"
              placeholder="Videojuegos 🎮"
            />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        {items.length === 0 ? (
          <p>
            <strong>No hay elementos en la lista.</strong>
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <Item
                  {...item}
                  handleClick={createHandleRemoveItem(item.id)}
                  key={item.id}
                />
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
export default App;
