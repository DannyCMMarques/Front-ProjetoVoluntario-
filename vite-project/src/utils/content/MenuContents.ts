
const MenuContents = ({ home, dados, voluntarios, idosos, atividades }) => {
  const menuCardContent = [
    {
      id: 1,
      href: "/home",
      titulo: "Home",
      icones: home,
    },
    {
      id: 2,
      href: "/usuario",
      titulo: "Meus dados ",
      icones: dados,
    },
    {
      id: 3,
      href: "/voluntarios",
      titulo: "Voluntários",
      icones: voluntarios,
    },
    {
      id: 4,
      href: "/idosos",
      titulo: "Idosos",
      icones: idosos,
    },
    {
      id: 5,
      href: "/minhas-atividades",
      titulo: "Agenda ",
      icones: atividades,
    },
  ];

  return menuCardContent;
};

export default MenuContents;