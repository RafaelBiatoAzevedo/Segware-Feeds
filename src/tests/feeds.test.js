import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Feed from '../components/Feed';
import Feeds from '../pages/Feeds';

describe('Testando Componente Feed', () => {
  const testFeedComplete = {
    name: 'Rafael Azevedo',
    content: 'Mensagem test #VQV',
    countUpvotes: 0,
  };

  const testFeedWithName = {
    content: 'Mensagem test #VQV',
    countUpvotes: 0,
  }

  const testFeedWithcountUpvotes = {
    name: 'Rafael Azevedo',
    content: 'Mensagem test #VQV',
  }

  const testFeedWithNameAndUpvotes = {
    content: 'Mensagem test #VQV',
  }

  it('Avatar é renderizado', () => {
    const { getByTestId  } = render(<Feed feed={ testFeedComplete } index="0" setUpvotes=""/>);

    expect(getByTestId('imgAvatar-feed')).toBeInTheDocument();
    expect(getByTestId('imgAvatar-feed').src).toBe('http://localhost/genericAvatar.jpg');
    expect(getByTestId('imgAvatar-feed').alt).toBe('avatar');
  });

  it('Nome é renderizado', () => {
    const { getByTestId } = render(<Feed feed={ testFeedComplete } index="0" setUpvotes=""/>);

    expect(getByTestId('name-feed')).toBeInTheDocument();
    expect(getByTestId('name-feed').textContent).toBe('Rafael Azevedo');
  });

  it('Mensagem é renderizada', () => {
    const { getByTestId  } = render(<Feed feed={ testFeedComplete } index="0" setUpvotes=""/>);

    expect(getByTestId('msg-feed')).toBeInTheDocument();
    expect(getByTestId('msg-feed').textContent).toBe('Mensagem test #VQV');
  });

  it('Botão é renderizado com UpvotesIcon', () => {
    const { getByTestId } = render(<Feed feed={ testFeedComplete } index="0" setUpvotes=""/>);

    expect(getByTestId('btnUpvotes-feed')).toBeInTheDocument();
    expect(getByTestId('btnUpvotes-feed').firstChild).toBeInTheDocument();
    expect(getByTestId('btnUpvotes-feed').firstChild.src).toBe('http://localhost/upvoteIcon.png');
    expect(getByTestId('imgUpvotes-feed')).toBeInTheDocument();
  });

  it('Contador de Upvotes é renderizado', () => {
    const { getByTestId  } = render(<Feed feed={ testFeedComplete } index="0" setUpvotes=""/>);

    expect(getByTestId('countUpvotes-feed')).toBeInTheDocument();
    expect(getByTestId('countUpvotes-feed').textContent).toBe('0');
  });

  it('Nome é renderizado como "Anônimo" quando não informado', () => {
    const { getByTestId } = render(<Feed feed={ testFeedWithName } index="0" setUpvotes=""/>);

    expect(getByTestId('name-feed')).toBeInTheDocument();
    expect(getByTestId('name-feed').textContent).toBe('Anônimo');
  });

  it('Contador de Upvotes é renderizado com valor 0 quando não informado', () => {
    const { getByTestId  } = render(<Feed feed={ testFeedWithcountUpvotes } index="0" setUpvotes=""/>);

    expect(getByTestId('countUpvotes-feed')).toBeInTheDocument();
    expect(getByTestId('countUpvotes-feed').textContent).toBe('0');
  });

  it('Nome renderiza "Anônimo" e Contador de Upvotes renderiza 0, quando ambos não informados', () => {
    const { getByTestId  } = render(<Feed feed={ testFeedWithNameAndUpvotes } index="0" setUpvotes=""/>);

    expect(getByTestId('countUpvotes-feed')).toBeInTheDocument();
    expect(getByTestId('countUpvotes-feed').textContent).toBe('0');
  });
});

describe('Testando Página Feeds', () => {
  describe('Verifica elementos do Header', () => {
    it('LogoSegware e título "Feeds" são renderizados', () => {
      const { getByTestId } = render(<Feeds />);
      
      expect(getByTestId('logoSegware-header')).toBeInTheDocument();
      expect(getByTestId('logoSegware-header').src).toBe('http://localhost/logoSegware.png');
      expect(getByTestId('h1-header')).toBeInTheDocument();
      expect(getByTestId('h1-header').textContent).toBe('Feeds');
    });
  });

  describe('Verifica lista de Feeds', () => {
    it('Lista de feeds é renderizada com apenas o Feed de boas vindas', () => {
      const { getByTestId, getAllByTestId } = render(<Feeds />);

      expect( getAllByTestId('feed').length).toBe(1);
      expect(getByTestId('name-feed').textContent).toBe('Segware');
      expect(getByTestId('msg-feed').textContent).toBe('Bem vindo(a) ao nooso feeds ! Deixe seu comentário.');
      expect(getByTestId('countUpvotes-feed').textContent).toBe('0');
    });

    afterEach(() => jest.clearAllMocks());
    it('Retorno da API é renderizado', async () => {
      const jsonFeeds = [
        {
          name: 'Rafael Azevedo',
          content: '#VQV rafa',
          countUpvotes: 4,
        },
        {
          name: 'Larissa Azevedo',
          content: '#VQV lary',
          countUpvotes: 10,
        },
      ];
      
      global.fetch = jest.fn().mockResolvedValue({ 
        json: jest.fn().mockResolvedValue(jsonFeeds),
      });

      const { findByText, getAllByTestId } = render(<Feeds />);

      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://segware-book-api.segware.io/api/feeds');

      await findByText('Rafael Azevedo');

      expect(getAllByTestId('feed').length).toBe(3);
      
    });

    it('Botão do upvotes incrementa um em contador da feed', () => {
      const { getAllByTestId } = render(<Feeds />);

      expect(getAllByTestId('feed').length).toBe(1);

      const countTest = getAllByTestId('countUpvotes-feed')[0];
      expect(countTest).toHaveTextContent('0');

      const btnTest =  getAllByTestId('btnUpvotes-feed')[0];
      expect(btnTest).toBeInTheDocument();
      
      fireEvent.click(btnTest);

      expect(countTest).toHaveTextContent('1');
    });
  });

  describe('Verifica Form que adiciona um Feed', () => {
    const NAME = 'Rafael Azevedo';
    const MSG_FEED = 'Mensagem de test #VQV';

    it('Input nome é renderizado vazio', () => {
      const { getByTestId } = render(<Feeds />);

      expect(getByTestId('input-name')).toBeInTheDocument();
      expect(getByTestId('input-name').textContent).toBe('');
    });
  
    it('Input mensagem é renderizado vazio', () => {
      const { getByTestId } = render(<Feeds />);

      expect(getByTestId('input-msg')).toBeInTheDocument();
      expect(getByTestId('input-msg').textContent).toBe('');
    });

    it('Botão postar é renderizado com texto "Postar"', () => {
      const { getByTestId } = render(<Feeds />);

      expect(getByTestId('btn-post')).toBeInTheDocument();
      expect(getByTestId('btn-post').textContent).toBe('Postar');
    });

    it('Clicar no botão postar é adicionado um novo feed', () => {
      const { getByTestId, getAllByTestId } = render(<Feeds />);

      expect(getByTestId('input-name')).toBeInTheDocument();
      expect(getByTestId('input-name').textContent).toBe('');
      expect(getByTestId('input-msg')).toBeInTheDocument();
      expect(getByTestId('input-msg').textContent).toBe('');
      expect(getByTestId('btn-post')).toBeInTheDocument();
      expect(getByTestId('btn-post').textContent).toBe('Postar');

      expect(getAllByTestId('feed').length).toBe(1);

      fireEvent.change(getByTestId('input-name'), { target: { value: NAME } });
      fireEvent.change(getByTestId('input-msg'), { target: { value: MSG_FEED } });
      fireEvent.click(getByTestId('btn-post'));
      
      expect(getAllByTestId('feed').length).toBe(2);
      expect(getAllByTestId('name-feed')[1].textContent).toBe(NAME);
      expect(getAllByTestId('msg-feed')[1].textContent).toBe(MSG_FEED);
    });
  });
});
