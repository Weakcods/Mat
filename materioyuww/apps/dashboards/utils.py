class TemplateLayout:
    @staticmethod
    def init(context):
        """
        Initialize the template layout context with common variables
        """
        # Add any common template variables here
        context['layout_path'] = 'layout/layout_vertical.html'  # Update to use the correct template
        context['is_menu'] = True
        context['is_navbar'] = True
        context['is_footer'] = True
        context['is_flex'] = False
        context['container_class'] = 'container-xxl'
        context['content_layout_class'] = 'layout-menu-fixed'
        context['url'] = '/'
        context['layout'] = {
            'title': 'Dashboard',
            'content_class': 'container-xxl flex-grow-1 container-p-y',
            'navbar_full': False,
            'navbar_content': True,
            'footer': True,
            'menu_collapsed': False,
            'menu_fixed': True,
            'menu_navbar': True,
            'menu_footer': True,
            'menu_custom': True,
            'menu_dropdown': True,
            'menu_scroll': True,
            'menu_style': 'vertical',
            'menu_theme': 'theme-default',
            'menu_theme_dark': 'theme-dark',
            'menu_theme_light': 'theme-light',
            'menu_theme_semidark': 'theme-semidark',
            'menu_theme_bordered': 'theme-bordered',
            'menu_theme_semidark_bordered': 'theme-semidark-bordered',
            'menu_theme_light_bordered': 'theme-light-bordered',
            'menu_theme_dark_bordered': 'theme-dark-bordered',
            'menu_theme_semidark_bordered_primary': 'theme-semidark-bordered-primary',
            'menu_theme_light_bordered_primary': 'theme-light-bordered-primary',
            'menu_theme_dark_bordered_primary': 'theme-dark-bordered-primary',
            'menu_theme_semidark_bordered_secondary': 'theme-semidark-bordered-secondary',
            'menu_theme_light_bordered_secondary': 'theme-light-bordered-secondary',
            'menu_theme_dark_bordered_secondary': 'theme-dark-bordered-secondary',
            'menu_theme_semidark_bordered_success': 'theme-semidark-bordered-success',
            'menu_theme_light_bordered_success': 'theme-light-bordered-success',
            'menu_theme_dark_bordered_success': 'theme-dark-bordered-success',
            'menu_theme_semidark_bordered_info': 'theme-semidark-bordered-info',
            'menu_theme_light_bordered_info': 'theme-light-bordered-info',
            'menu_theme_dark_bordered_info': 'theme-dark-bordered-info',
            'menu_theme_semidark_bordered_warning': 'theme-semidark-bordered-warning',
            'menu_theme_light_bordered_warning': 'theme-light-bordered-warning',
            'menu_theme_dark_bordered_warning': 'theme-dark-bordered-warning',
            'menu_theme_semidark_bordered_danger': 'theme-semidark-bordered-danger',
            'menu_theme_light_bordered_danger': 'theme-light-bordered-danger',
            'menu_theme_dark_bordered_danger': 'theme-dark-bordered-danger',
            'menu_theme_semidark_bordered_dark': 'theme-semidark-bordered-dark',
            'menu_theme_light_bordered_dark': 'theme-light-bordered-dark',
            'menu_theme_dark_bordered_dark': 'theme-dark-bordered-dark',
            'menu_theme_semidark_bordered_primary_dark': 'theme-semidark-bordered-primary-dark',
            'menu_theme_light_bordered_primary_dark': 'theme-light-bordered-primary-dark',
            'menu_theme_dark_bordered_primary_dark': 'theme-dark-bordered-primary-dark',
            'menu_theme_semidark_bordered_secondary_dark': 'theme-semidark-bordered-secondary-dark',
            'menu_theme_light_bordered_secondary_dark': 'theme-light-bordered-secondary-dark',
            'menu_theme_dark_bordered_secondary_dark': 'theme-dark-bordered-secondary-dark',
            'menu_theme_semidark_bordered_success_dark': 'theme-semidark-bordered-success-dark',
            'menu_theme_light_bordered_success_dark': 'theme-light-bordered-success-dark',
            'menu_theme_dark_bordered_success_dark': 'theme-dark-bordered-success-dark',
            'menu_theme_semidark_bordered_info_dark': 'theme-semidark-bordered-info-dark',
            'menu_theme_light_bordered_info_dark': 'theme-light-bordered-info-dark',
            'menu_theme_dark_bordered_info_dark': 'theme-dark-bordered-info-dark',
            'menu_theme_semidark_bordered_warning_dark': 'theme-semidark-bordered-warning-dark',
            'menu_theme_light_bordered_warning_dark': 'theme-light-bordered-warning-dark',
            'menu_theme_dark_bordered_warning_dark': 'theme-dark-bordered-warning-dark',
            'menu_theme_semidark_bordered_danger_dark': 'theme-semidark-bordered-danger-dark',
            'menu_theme_light_bordered_danger_dark': 'theme-light-bordered-danger-dark',
            'menu_theme_dark_bordered_danger_dark': 'theme-dark-bordered-danger-dark',
            'menu_theme_semidark_bordered_dark_dark': 'theme-semidark-bordered-dark-dark',
            'menu_theme_light_bordered_dark_dark': 'theme-light-bordered-dark-dark',
            'menu_theme_dark_bordered_dark_dark': 'theme-dark-bordered-dark-dark',
        }
        return context 