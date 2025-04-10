import React, { useState } from "react";
import axios from "axios";
import styles from "./GaleriaCaes.module.css";

const GaleriaCaes = () => {
  const [caes, setCaes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCaes = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.thedogapi.com/v1/images/search?limit=5&has_breeds=1",
        {
          headers: {
            "x-api-key":
              "live_5PcfezHEdq5T0jh36HA5duHko4kxnfCB9oPTurPKCSGIR6dJAxgjcFtAGbHhcLMX",
          },
        }
      );
      setCaes(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container_titulo}>
          <h1 className={styles.titulo}>Galeria de Cães</h1>
          <p className={styles.paragrafo}>Clique no botão para alterar os cães listado</p>
          <button className={styles.botao} onClick={fetchCaes}> Buscar Cães </button>
          {loading && <p>Carregando...</p>}
      </div>

      <div className={styles.container_principal}>
        {caes.map((caes, index) => (
          <div className={styles.container_caes}>
            <img key={index} src={caes.url} alt="Caes" />
            {caes.breeds && caes.breeds.length > 0 && (
              <div className={styles.container_infos}>
                {caes.breeds[0].name}
                <p>{caes.breeds[0].temperament}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaCaes;
