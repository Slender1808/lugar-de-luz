import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import ProdutosList from "./List";

const ProdutosQuery = gql`
  query Produtos($offset: Int) {
    PRODUTOS(offset: $offset, limit: 9, order_by: { NCM: asc }) {
      COD_PROD
      DESC_PROD
      MARCA
      NCM
      PESO_LIQ
      QUANTIDADE
      REFERENCIA
      UNIDADE
    }
  }
`;

export default function Query(variables) {
  const [state, setState] = useState([]);
  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(ProdutosQuery, {
    variables: { offset: offset },
  });
  useEffect(() => {
    if (data) {
      setState(data.PRODUTOS);
    }
  }, [loading]);

  useEffect(() => {
    setOffset(variables.variables + 9);
  }, [variables]);
 
  useEffect(() => {
    if (variables.variables != offset) {
      //console.log("useEffect variables ", state.PRODUTOS);
      if (data) {
        if (state) {
          console.log("state ", state);
          console.log("data ", data);

          setState(state.concat(data.PRODUTOS));
          return;
        }
      }
    }

    if (data) {
      console.log("Erro useEffect");
      console.log(data);
      setState(data.PRODUTOS);
    }
  }, [data]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error : {error}</p>;

  if (data) {
    return (
      <ol className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pl-0">
        {state.map((e) => {
          return <ProdutosList key={e.COD_PROD} produto={e} />;
        })}
      </ol>
    );
  }
}