export const corPrincipal = "#59b6ff";
export const corSecundaria = "#706ef9";
export const corTextos = "#f2f2f2";
export const corFundo = "#0d0d0d";
export const corFundo2 = "#262626";

const Estilos = {
  div: {
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  },

  conteudo: {
    flex: 1,
    width: "100%",
    backgroundColor: corFundo,
  },
  titulo: {
    textAlign: "center",
    fontSize: 40,
    color: "#2C3E50", // Azul-escuro para um visual elegante
    fontWeight: "bold",
    marginBottom: 25,
    letterSpacing: 1, // Espaçamento entre letras para refinamento
  },
  texto: {
    textAlign: "center",
    fontSize: 20,
    color: "#2C3E50", // Azul-escuro para um visual elegante
    fontWeight: "bold",
    marginBottom: 25,
    letterSpacing: 1, // Espaçamento entre letras para refinamento
  },

  botao: {
    backgroundColor: "#2C3E50",
    color: "#fff",
    padding: 10,
    borderRadius: 50,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    width: 150,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    cursor: "pointer",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
    width: "80%",
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: '#934FA5',
    color: 'white',
    border: 'none',
    padding: 10,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  dropdown: {
    backgroundColor: "white",
    padding: "10px 15px",
    borderRadius: 15,
    border: "none",
    fontWeight: "bold",
    color: "#4b0082",
    height: 45,
    minWidth: 120,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  },
  iconButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

export default Estilos;
