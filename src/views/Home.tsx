import { Card, Col, Image, Row } from "antd";
import React from "react";

export default function Home() {
  return (
    <div>
      <Card title="Projet SOA & Cloud" bordered={false}>
        <div>
          <Row justify="center">
            <Col>
              <Image width={200} src="/achraf.png"></Image>
            </Col>
            <Col>
              <Image width={200} src="/adel.PNG"></Image>
            </Col>
          </Row>
          <div className="home-description">
            <p>
              Cette application est développée dans le cadre d'un projet SOA &
              CLOUD proposé par Messieurs Heithem Abbess & Islam Denen{" "}
            </p>
            <p>
              L'application offre une gestion totale pour le Département
              Informatique au seins de la Faculté Des sciences. Ainsi qu'un
              Dashboard pour la consultation des statistiques.
            </p>
            <p>
              L'application est dépoyé sur AWS, la partie Backend est developpé
              avec Spring Boot, Spring Cloud en adoptant l'architecture
              Microservices, et la partie front est développé avec React &
              Typescript. <br></br>
              La conteneurisation est assuré par Docker et Docker-Compose.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
