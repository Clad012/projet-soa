import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Store from "./views/Store";
import ListEtudiantView from "./views/Etudiant/ListEtudiant";
import ListEnseignantView from "./views/Enseignant/ListEnseignant";
import ListCadreView from "./views/Cadre/ListCadre";

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/etudiants" component={ListEtudiantView} />
    <Route exact path="/enseignants" component={ListEnseignantView} />
    <Route exact path="/cadres" component={ListCadreView} />
    <Route exact path="/store" component={Store} />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
);

export default Routes;
