const MenuContents = (icons) => {
  const menuItems = [
    {
      id: "home",
      icon: icons.home,
      label: "Home",
      submenus: [],
    },
    {
      id: "usuarios",
      icon: icons.users,
      label: "Usuários",
      submenus: [
        {
          id: "usuario",
          label: "Meu Perfil",
        },
        {
          id: "voluntario",
          label: "Voluntários",
        },
        {
          id: "idoso",
          label: "Idoso",
        },
      ],
    },
    {
      id: "agenda",
      icon: icons.calendar,
      label: "Agenda",
      submenus: [],
    },
  ];

  return menuItems;
};

export default MenuContents;
