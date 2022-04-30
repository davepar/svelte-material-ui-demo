<script context="module" lang="ts">
  /** @type {import('customers.Load} */
  export async function load({ params, fetch, session, stuff }) {
    const response = await fetch('./customers');
    return {
      status: response.status,
      props: {
        data: response.ok && (await response.json()),
      },
    };
  }
</script>

<script lang="ts">
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import FormField from '@smui/form-field';
  import Radio from '@smui/radio';
  import Checkbox from '@smui/checkbox';
  import type { Customer } from './customers';
  import { Frequency, Region, FREQUENCY_OPTIONS, REGION_OPTIONS } from './customers';

  export let data: {
    customers: Customer[];
  };

  let dialogOpen = false;

  function openDialog() {
    dialogOpen = true;
  }

  function saveCustomer() {
    data.customers.push(newCustomer);
    data = { ...data };
    dialogOpen = false;
  }

  const newCustomer = {
    name: '',
    region: null,
    frequency: null,
    newsletter: false,
  };
</script>

<svelte:head>
  <title>Svelte Material UI</title>
  <meta name="description" content="A demo of the Svelte Material UI library" />
  <!-- Material Icons -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <!-- Roboto -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
  />
  <!-- Roboto Mono -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
  <!-- SMUI Styles -->
  <link rel="stylesheet" href="/smui.css" />
</svelte:head>

<h1>Sample page for Svelte Material UI</h1>
<p>Visit <a href="https://kit.svelte.dev">web.site.here</a> for more info</p>

<div>
  <Button on:click={openDialog} variant="raised">
    <Label>Add Customer</Label>
  </Button>
</div>

<div>
  <DataTable table$aria-label="Customer list" style="max-width: 100%;">
    <Head>
      <Row>
        <Cell>Name</Cell>
        <Cell>Region</Cell>
        <Cell>Frequency</Cell>
        <Cell>Newsletter</Cell>
      </Row>
    </Head>
    <Body>
      {#each data.customers as customer}
        <Row>
          <Cell>{customer.name}</Cell>
          <Cell>{Region[customer.region]}</Cell>
          <Cell>{Frequency[customer.frequency]}</Cell>
          <Cell style="text-align: center">{@html customer.newsletter ? '&#10003;' : ''}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
</div>

<Dialog bind:open={dialogOpen} aria-labelledby="simple-title" aria-describedby="simple-content">
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Add Customer</Title>
  <Content id="simple-content" style="min-height: 25em">
    <Textfield type="text" bind:value={newCustomer.name} label="Name" style="min-width: 250px;">
      <HelperText persistent slot="helper">Customer's full name.</HelperText>
    </Textfield>

    <Select bind:value={newCustomer.region} label="Region">
      {#each REGION_OPTIONS as { label, value }}
        <Option {value}>{label}</Option>
      {/each}
    </Select>

    <div>
      {#each FREQUENCY_OPTIONS as { label, value }}
        <FormField>
          <Radio bind:group={newCustomer.frequency} {value} />
          <span slot="label">{label}</span>
        </FormField>
      {/each}
    </div>

    <div>
      <FormField>
        <Checkbox bind:checked={newCustomer.newsletter} />
        <span slot="label">Newsletter</span>
      </FormField>
    </div>
  </Content>
  <Actions>
    <Button on:click={() => false}>
      <Label>Cancel</Label>
    </Button>
    <Button variant="raised" on:click={saveCustomer}>
      <Label>Add</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  div {
    margin-top: 1em;
  }
</style>
