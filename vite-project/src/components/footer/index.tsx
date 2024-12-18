const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Endereço</h3>
              <p className="text-sm">
                Rua Fictícia, 123 - Bairro Imaginário<br />
                Cidade Exemplo - Estado<br />
                CEP: 12345-678
              </p>
              <p className="text-sm mt-2">Funcionamos 24 horas por dia!</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <p className="text-sm">Telefone: (11) 1234-5678</p>
              <p className="text-sm">WhatsApp: (11) 98765-4321</p>
              <p className="text-sm">Email: contato@seniorcare.com</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Senior Care. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;
