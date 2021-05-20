import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Grid, MenuItem, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Width } from "../ui";
import PageTitle from "../lib/PageTitle.js";
import NotFound from "../pages/NotFound.js";
import {
  hasFormErrors,
  FormErrors,
  TextFieldWithError,
  ChoiceFieldWithError,
} from "../FormErrors.js";
import { useFormInput } from "../lib/forms.js";
import ButtonWithProgress from "../lib/ButtonWithProgress.js";
import PlantEditMutation from "./PlantEdit.mutation.js";
import BreadcrumbsWithHome from "../lib/BreadcrumbsWithHome.js";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

function Plant(props) {
  const {
    classes,
    plant,
    edibilities,
    ranks,
    flowerTypes,
    flowerColors,
    growthHabits,
    setFormErrors,
    environment,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const titleField = useFormInput(plant.title);
  const descriptionField = useFormInput(plant.description);
  const edibilityField = useFormInput(plant.edibility);
  const rankField = useFormInput(plant.rank);

  const sunField = useFormInput(plant.sun);
  const spreadField = useFormInput(plant.spread);
  const heightField = useFormInput(plant.height);

  const flowerTypeField = useFormInput(plant.flowerTypes || []);
  const flowerColorsField = useFormInput(plant.flowerColors || []);
  const growthHabitField = useFormInput(plant.growthHabit || []);

  const [isSaving, setIsSaving] = useState(false);

  if (!plant) {
    return <NotFound />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setIsSaving(true);
    PlantEditMutation.commit(
      environment,
      {
        id: plant.id,
        title: titleField.value,
        description: descriptionField.value,
        edibility: edibilityField.value,
        rank: edibilityField.rankField,

        flowerTypes: flowerTypeField.value,
        flowerColors: flowerColorsField.value,
        growthHabit: growthHabitField.value,
        sun: sunField.value,
        spread: spreadField.value,
        height: heightField.value,
      },
      {
        setFormErrors,
        onSuccess: () => {
          enqueueSnackbar("Editada com sucesso", { variant: "success" });
          setIsSaving(false);
        },
        onError: () => {
          enqueueSnackbar("Ocorreu um erro", { variant: "error" });
          setIsSaving(false);
        },
      }
    );
  }

  return (
    <Width>
      <Helmet title={`Editando: ${plant.title}`} />
      <BreadcrumbsWithHome>
        <BreadcrumbsItem to="/plantas">Plantas</BreadcrumbsItem>
        <BreadcrumbsItem to={`/${plant.slug}-p${plant.idInt}/editar`}>
          {`Editando: ${plant.title}`}
        </BreadcrumbsItem>
      </BreadcrumbsWithHome>
      <PageTitle>Editando: {plant.title}</PageTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextFieldWithError
              margin="dense"
              label="Titulo"
              errorFilter={{ location: "title" }}
              required
              fullWidth
              {...titleField}
            />

            <TextFieldWithError
              margin="dense"
              label="Descrição"
              errorFilter={{ location: "description" }}
              fullWidth
              multiline
              {...descriptionField}
            />

            <TextFieldWithError
              margin="dense"
              label="Sun"
              errorFilter={{ location: "sun" }}
              required
              fullWidth
              {...sunField}
            />

            <TextFieldWithError
              margin="dense"
              label="Spread"
              errorFilter={{ location: "spread" }}
              required
              fullWidth
              {...spreadField}
            />

            <TextFieldWithError
              margin="dense"
              label="Height"
              errorFilter={{ location: "height" }}
              required
              fullWidth
              {...heightField}
            />

            <TextFieldWithError
              margin="dense"
              label="Comestibilidade"
              errorFilter={{ location: "edibility" }}
              fullWidth
              select
              {...edibilityField}
            >
              {edibilities.enumValues.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.description}
                  </MenuItem>
                );
              })}
            </TextFieldWithError>

            <TextFieldWithError
              margin="dense"
              label="Rank"
              errorFilter={{ location: "rank" }}
              fullWidth
              select
              {...rankField}
            >
              {ranks.enumValues.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.description}
                  </MenuItem>
                );
              })}
            </TextFieldWithError>

            <ChoiceFieldWithError
              margin="dense"
              label="Flower Type"
              errorFilter={{ location: "flowerTypes" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...flowerTypeField}
              choices={flowerTypes}
            />

            <ChoiceFieldWithError
              margin="dense"
              label="Flower Color"
              errorFilter={{ location: "flowerColors" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...flowerColorsField}
              choices={flowerColors}
            />
            <ChoiceFieldWithError
              margin="dense"
              label="Growth Habit"
              errorFilter={{ location: "growthHabits" }}
              fullWidth
              select
              SelectProps={{
                multiple: true,
              }}
              {...growthHabitField}
              choices={growthHabits}
            />

            <FormErrors
              filter={(error) => ["__all__", null].indexOf(error.location) >= 0}
            />

            <ButtonWithProgress
              variant="outlined"
              className={classes.button}
              type="submit"
              isLoading={isSaving}
            >
              salvar alteração
            </ButtonWithProgress>
          </form>
        </Grid>
      </Grid>
    </Width>
  );
}

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
});
export default withStyles(styles)(hasFormErrors(Plant));
