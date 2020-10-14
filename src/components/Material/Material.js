import React, { Component } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Chip,
  Paper,
  Avatar,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import './Material.css';

class Material extends Component {

  onClick = () => {
    console.log('sup');

  }

  render() {
    return (
      <Card>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar>
                R
              </Avatar>
            }
            title='Creature Name'
            subheader='Type: Creature Label'
          />
          <CardContent>


          </CardContent>
        </CardActionArea>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
        ><strong>Hello!</strong>
        </Typography>
        <Box mb={3}>
          <Typography
            variant='body1'
            component='p'
            gutterBottom
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra
            lacus ut ex molestie blandit. Etiam et turpis sit amet risus
            mollis interdum. Suspendisse et justo vitae metus bibendum
            fringilla sed sed justo. Aliquam sollicitudin dapibus lectus,
            vitae consequat odio elementum eget. Praesent efficitur eros vitae
            nunc interdum, eu interdum justo facilisis. Sed pulvinar nulla ac
            dignissim efficitur. Quisque eget eros metus. Vestibulum bibendum
            fringilla nibh a luctus. Duis a sapien metus.
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          alignItems='center'>
          <Grid item xs={3} className='button'>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onClick}
            >
              Hi
            </Button>
          </Grid>
          <Grid item xs={3} className='button'>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onClick}
            >
              How
            </Button>
          </Grid>
          <Grid item xs={3} className='button'>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onClick}
            >
              Are
            </Button>
          </Grid>
          <Grid item xs={3} className='button'>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onClick}
            >
              You
            </Button>
          </Grid>
        </Grid>
        <Box mb={3}>
          <TextField
            label='This is the label'
            variant='filled'
            multiline
            gutterBottom
          />
        </Box>
        <Box mb={3}>
          <TextField
            label='This is the label'
            variant='outlined'
            multiline
            rows={10}
            fullWidth='true'
          />
        </Box>
        <Box mb={3}>
          <FormControl
            variant='outlined'
            fullWidth
          >
            <InputLabel id='type-select-labe'>Number:</InputLabel>
            <Select
              labelId='type-select-label'
              value='number'
            >
              <MenuItem value=''>Select a Number</MenuItem>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>

            </Select>
          </FormControl>
        </Box>
      </Card>
    )
  }
}

export default Material;