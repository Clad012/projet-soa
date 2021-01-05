import { Card, Image, Row, Col } from "antd";
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
              CLOUD proposé par Monsieur Heithem Abbess & Islam Denen{" "}
            </p>
            <p>
              L'application offre une gestion totale pour le département
              informatique au seins de la faculté des sciences. Ainsi qu'un
              Dashboard pour la consultation des statistiques.
            </p>
            <p>
              L'application est dépoyé sur AWS, la partie Backend est developpé
              avec Spring Boot, Spring Cloud en adoptant l'architecture
              Microservices et en utilisant Docker et Docker Compose pour la
              containr???
            </p>
            <p>La partie Front End est développée avec React Typescript</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
