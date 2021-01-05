import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Store from "./views/Store";
import ListEtudiantView from "./views/Etudiant/ListEtudiant";
import ListEnseignantView from "./views/Enseignant/ListEnseignant";
import ListCadreView from "./views/Cadre/ListCadre";
import ListAbsenceView from "./views/Absence/ListAbsence";
import ListResultatView from "./views/Resultat/ListResultat";
import StatistiqueResultatView from "./views/Statistique/ResultatView";
import StatistiqueAbsenceView from "./views/Statistique/AbsenceView";
import HomeView from "./views/Home";

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
    <Route exact path="/etudiants" component={ListEtudiantView} />
    <Route exact path="/enseignants" component={ListEnseignantView} />
    <Route exact path="/cadres" component={ListCadreView} />
    <Route exact path="/absences/:id_etudiant" component={ListAbsenceView} />
    <Route exact path="/resultats/:id_etudiant" component={ListResultatView} />
    <Route
      exact
      path="/statistiques/resultats"
      component={StatistiqueResultatView}
    />
    <Route
      exact
      path="/statistiques/absences"
      component={StatistiqueAbsenceView}
    />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
);

export default Routes;
