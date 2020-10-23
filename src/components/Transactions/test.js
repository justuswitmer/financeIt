<div className={classes.root}>
  <Accordion defaultExpanded>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1c-content"
      id="panel1c-header"
    >
      <div className={classes.column}>
        <Typography className={classes.heading}>Location</Typography>
      </div>
      <div className={classes.column}>
        <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
      </div>
    </AccordionSummary>
    <AccordionDetails className={classes.details}>
      <div className={classes.column} />
      <div className={classes.column}>
        <Chip label="Barbados" onDelete={() => { }} />
      </div>
      <div className={clsx(classes.column, classes.helper)}>
        <Typography variant="caption">
          Select your destination of choice
        <br />
          <a href="#secondary-heading-and-columns" className={classes.link}>
            Learn more
        </a>
        </Typography>
      </div>
    </AccordionDetails>
    <Divider />
    <AccordionActions>
      <Button size="small">Cancel</Button>
      <Button size="small" color="primary">
        Save
    </Button>
    </AccordionActions>
  </Accordion>
</div>