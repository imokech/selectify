# Selectify
<img alt="npm" src="https://img.shields.io/npm/v/@mokech/selectify">

Selectify is a jQuery-based replacement for select boxes. It supports searching, remote data sets.

## Install 
`` $ npm install @mokech/selectify ``
## Use Casses
- select box with checkbox for each option
- search in select options

## How To Use
- Add css and js file in your project
- Add "selectify" class to select tag
- Enable/Disable search box via "search" option in config object  *(dafault is true)* 
- Set your message through "language" option :
  - not_found : not found item
  - placeholder : search box placeholder
- Add "data-count" attribute for displaying count of item after option text
- If user can select multiple options add "multiple" to select tag and displays checkbox
 *(If user is limited to select one option, selectify displays radio button)* 

## Example #1
```html
<select id="unique-select" class="selectify">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
</select>

<script>
    $('#unique-select').selectify();
</script>
```

## Example #2
```html
<select id="unique-select" class="selectify" multiple>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
</select>

<script>
    $('#unique-select').selectify({
        search: false,
        language: {
            not_found: 'There is no item',
            placeholder: 'Search options'
        }
    });
</script>
```

## Example #3
```html
<select id="unique-select" class="selectify" multiple>
    <option data-count="34">1</option>
    <option data-count="69">2</option>
    <option data-count="58">3</option>
    <option data-count="72">4</option>
</select>

<script>
    $('#unique-select').selectify({
        search: true,
        language: {
            not_found: 'There is no item',
            placeholder: 'Search options'
        }
    });
</script>
```