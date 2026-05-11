export type Light = "verde" | "amarillo" | "rojo";

export type Situation = {
  id: string;
  emoji: string;
  text: string;
  answer: Light;
};

export const SITUATIONS: Situation[] = [
  { id: "abrazo", emoji: "🤗", text: "Un abrazo cuando estoy triste", answer: "verde" },
  { id: "compartir", emoji: "🍎", text: "Compartir mi merienda", answer: "verde" },
  { id: "jugar", emoji: "🤝", text: "Jugar todos juntos en paz", answer: "verde" },
  { id: "escuchar", emoji: "👂", text: "Escuchar lo que siento", answer: "verde" },
  { id: "ignorar", emoji: "🙈", text: "Que me ignoren en el recreo", answer: "amarillo" },
  { id: "burla", emoji: "😒", text: "Burlas por mi ropa", answer: "amarillo" },
  { id: "exclusion", emoji: "🚷", text: "No dejarme jugar a propósito", answer: "amarillo" },
  { id: "apodo", emoji: "🗯️", text: "Apodos que me hacen sentir mal", answer: "amarillo" },
  { id: "grito", emoji: "📣", text: "Que me griten muy fuerte", answer: "rojo" },
  { id: "empujon", emoji: "👊", text: "Empujones o golpes", answer: "rojo" },
  { id: "amenaza", emoji: "⚠️", text: "Amenazas para asustarme", answer: "rojo" },
  { id: "tocar", emoji: "🛑", text: "Que toquen mi cuerpo sin permiso", answer: "rojo" },
];

export const FRIEND_ICONS = [
  { id: "smile", emoji: "😊", label: "Su sonrisa" },
  { id: "heart", emoji: "❤️", label: "Su cariño" },
  { id: "hug", emoji: "🤗", label: "Sus abrazos" },
  { id: "play", emoji: "🎲", label: "Jugar juntos" },
  { id: "listen", emoji: "👂", label: "Que me escuche" },
  { id: "share", emoji: "🤝", label: "Compartir" },
  { id: "laugh", emoji: "😂", label: "Reírnos" },
  { id: "draw", emoji: "🎨", label: "Crear cosas" },
  { id: "music", emoji: "🎵", label: "Cantar" },
  { id: "star", emoji: "⭐", label: "Es especial" },
  { id: "book", emoji: "📚", label: "Aprender" },
  { id: "sun", emoji: "☀️", label: "Su alegría" },
];
