(function ($) {
    'use strict';
    $.fn.selectify = function (config = {}) {
        const defaultConfig = {
            search: true,
            languages: {
                not_found: 'Nothing found.',
                placeholder: 'Search ...'
            },
        };
        config = $.extend({}, defaultConfig, config || {});
        const $selfs = [];

        $(this).each(function (s, selectify) {
            // Argument
            let $self = {
                name: $(selectify).attr('name') || '',
                selector: $(selectify),
                config: config,
                selected: [],
                multiple: $(selectify).attr('multiple') ? true : false,
                options: [],
                results: [],
                utils: {
                    trimString: function (s) {
                        var l = 0,
                            r = s.length - 1;
                        while (l < s.length && s[l] == ' ') l++;
                        while (r > l && s[r] == ' ') r -= 1;
                        return s.substring(l, r + 1);
                    },
                    compareObjects: function (o1, o2) {
                        var k = '';
                        for (k in o1)
                            if (o1[k] != o2[k]) return false;
                        for (k in o2)
                            if (o1[k] != o2[k]) return false;
                        return true;
                    },
                    itemExists: function (haystack, needle) {
                        for (var i = 0; i < haystack.length; i++)
                            if ($self.utils.compareObjects(haystack[i], needle)) return true;
                        return false;
                    },
                    // Rerender on Changing
                    onSelectChange: function(){
                        $self.selected = [];
                        if (!$self.multiple) {
                            $self.selected.push( $self.selector.val() );
                        } else {
                            $( $self.selector.val() ).each(function(i, selectedValue){
                                $self.selected.push(selectedValue);
                            });
                        }
                        $self.render();
                    },
                    // Initial rendered HTML
                    onHTMLChange: function(){
                        let selectorValue = Array.isArray( $self.selector.val() ) ? $self.selector.val() : [$self.selector.val()];
                        $( selectorValue ).each(function(i, selectedValue){
                            $self.selected.push(selectedValue);
                        });
                        if (!$self.multiple && $self.selected.length > 0) {
                            $self.selected = [$self.selected[$self.selected.length - 1]];
                        }
                        $self.render();
                    },
                    registerEvents: function(){
                        $self.selector.next().find('.selectify-option').unbind('click').click(function (e) {
                            let selectedValue = $(this).attr('data-value');
                            let selectedIndex = $self.selected.indexOf(selectedValue);
                            if(selectedIndex >= 0) {
                                $self.selected.splice(selectedIndex, 1);
                            } else if ($self.multiple) {
                                $self.selected.push(selectedValue);
                            } else {
                                $self.selected = [selectedValue];
                            }
                            $self.selector.val( $self.selected );
                            $self.render();
                        });
                    }
                },
                render: function () {
                    $self.selector.next().find('.select-area').find('.selectify-option, .selectify-alert').remove();
                    if ($self.results.length) {
                        $($self.results).each(function (index, option) {
                            if (
                                $self.selected.includes(option.value)
                            ) {
                                $self.selector.next().find('.select-area').find('.selectify-options').append('<div class="selectify-option selected" data-value="' + option.value + '"><input name="' + $self.name + 'Checkbox[]" type="' + ( $self.multiple ? 'checkbox' : 'radio') + '" value="' + option.value + '" checked>' + option.name + (option.count ? '<small class="selectify-option-count">' + option.count + '</small>' : '') +'</div>');
                            } else {
                                $self.selector.next().find('.select-area').find('.selectify-options').append('<div class="selectify-option" data-value="' + option.value + '"><input name="' + $self.name + 'Checkbox[]" type="' + ( $self.multiple ? 'checkbox' : 'radio') + '" value="' + option.value + '">' + option.name + (option.count ? '<small class="selectify-option-count">' + option.count + '</small>' : '') +'</div>');
                            }
                        });
                    } else {
                        $self.selector.next().find('.select-area').append('<div class="selectify-alert">' + config.languages.not_found + '</div>');
                    }
                    $self.utils.registerEvents();
                }
            }
            
            $self.selector.addClass('hide');
            $self.selector.after('<div class="selectify-wrapper"></div>');
            $self.selector.next().append('<div class="select-area"></div>');
            if ($self.config.search)
                $self.selector.next().find('.select-area').append('<input class="select-search" placeholder="' + $self.config.languages.placeholder + '">');
            $self.selector.next().find('.select-area').append('<div class="selectify-options"></div>');
            $self.options = $self.selector.find('option[value]');

            // Initial
            $($self.options).each(function (index, option) {
                $self.results.push({
                    name: $(option).text(),
                    value: $(option).val(),
                    count: $(option).attr('data-count'),
                });
                if ($(option).attr('selected')) {
                    $self.selected.push($(option).val())
                }
            });

            // Events
            $self.selector.next().find('.select-search').keyup(function () {
                $self.results = [];
                let toSearch = $self.utils.trimString($(this).val());
                $($self.options).each(function (index, option) {
                    if (
                        $(option).attr('value').indexOf(toSearch) != -1 ||
                        $(option).text().indexOf(toSearch) != -1
                    ) {
                        $self.results.push({
                            name: $(option).text(),
                            value: $(option).val(),
                            count: $(option).attr('data-count')
                        });
                    }
                });
                $self.render();
            });

            $self.selector.change(function () {
                $self.utils.onSelectChange();
            });

            $self.render();
            $selfs.push($self);
        });
        return $selfs;
    }
})(jQuery);